use anchor_lang::{
    prelude::*,
    solana_program::{pubkey::Pubkey, rent::Rent},
};
use crate::{state::reviews::Review, utils::constants::REVIEW_ACCOUNT};

pub fn buy_product_(ctx: Context<BuyProduct>) -> Result<String> {
    // let signer: Pubkey = ctx.accounts.authority.key();
    let balance: u64 = **ctx.accounts.authority.to_account_infos()[0]
        .lamports
        .borrow();
    let total_amount: u64 = Rent::default().minimum_balance(Review::SIZE);

    // Validate input & balances
    require_gte!(balance, total_amount);

    // Update state
    let review_account: &mut Account<Review> = &mut ctx.accounts.review_account;

    Ok(review_account.product_url.clone())
}

#[derive(Accounts)]
#[instruction()]
pub struct BuyProduct<'info> {
    #[account(mut, signer)]
    pub authority: AccountInfo<'info>,

    #[account(mut, seeds = [REVIEW_ACCOUNT, &authority.key().to_bytes()], bump = review_account.bump_original)]
    pub review_account: Account<'info, Review>,
}
