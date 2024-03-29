use anchor_lang::prelude::*;
use crate::{
    state::review::*,
    utils::constants::{REVIEW_ACCOUNT},
};
use anchor_lang::{
    prelude::*,
    solana_program::{pubkey::Pubkey, rent::Rent},
};

pub fn buy_product_(
    ctx: Context<BuyProduct>,
    name: String,
    description: String,
    product_url: String,
) -> Result<()> {
    let signer: Pubkey = ctx.accounts.authority.key();
    // let pda: Pubkey = ctx.accounts.pda.key();
    let balance: u64 = **ctx.accounts.authority.to_account_infos()[0].lamports.borrow();
    let total_amount: u64 = Rent::default().minimum_balance(Review::SIZE);
    // let (pda_review, bump) = Pubkey::find_program_address(&[&signer.to_bytes()], ctx.program_id);

    // validate input & balances
    require_gte!(balance, total_amount);

    // update state
    let review_account: &mut Account<Review> = &mut ctx.accounts.review_account;

    Ok((review_account.product_url))
}

#[derive(Accounts)]
#[instruction()]
pub struct BuyProduct<'info> {
    #[account(mut, signer)]
    pub authority: AccountInfo<'info>,

    #[account(mut, seeds = [REVIEW_ACCOUNT, &authority.key().to_bytes()], bump = review_account.bump_original)]
    pub review_account: Account<'info, Review>,

    #[account(mut)]
    // pub pda: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}