use anchor_lang::prelude::*;
use anchor_lang::solana_program::{pubkey::Pubkey, rent::Rent};
use crate::{
    state::{products::Product, reviews::Review},
    utils::constants::{MAX_DESCRIPTION, MAX_NAME, PRODUCT_ACCOUNT, REVIEW_ACCOUNT},
};

pub fn create_review_(
    ctx: Context<CreateReview>,
    name: String,
    description: String,
    product_url: String,
) -> Result<()> {
    let signer: Pubkey = ctx.accounts.authority.key();
    // let pda: Pubkey = ctx.accounts.pda.key();
    let balance: u64 = **ctx.accounts.authority.to_account_infos()[0]
        .lamports
        .borrow();
    let total_amount: u64 = Rent::default().minimum_balance(Review::SIZE);
    let (pda_review, bump) = Pubkey::find_program_address(&[&signer.to_bytes()], ctx.program_id);

    // validate input & balances
    // require_keys_eq!(pda, pda_review); //Not sure if keys should be same as user or product
    require_gte!(balance, total_amount);
    require_gte!(MAX_NAME, name.len());
    require_gte!(MAX_DESCRIPTION, description.len());

    // update state
    let review_account: &mut Account<Review> = &mut ctx.accounts.review_account;
    let product_account: &mut Account<Product> = &mut ctx.accounts.product_account;
    product_account.add_review(pda_review);
    review_account.set_bump_original(bump);
    review_account.set_authority(signer);
    review_account.set_name(name);
    review_account.set_description(description);
    review_account.set_rating(0.0); //initial rating
    review_account.set_product_url(product_url);

    Ok(())
}

#[derive(Accounts)]
#[instruction(product_url: String)]
pub struct CreateReview<'info> {
    #[account(mut, signer)]
    pub authority: AccountInfo<'info>,

    #[account(mut, seeds = [PRODUCT_ACCOUNT, &authority.key().to_bytes()], bump = product_account.bump_original)]
    pub product_account: Account<'info, Product>,

    #[account(
        init,
        seeds = [&REVIEW_ACCOUNT[..], &authority.key().to_bytes()[..]],
        bump,
        payer = authority,
        space = Review::SIZE + product_url.len())]
    pub review_account: Account<'info, Review>,

    #[account(mut)]
    pub pda: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
