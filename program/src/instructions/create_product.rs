use anchor_lang::prelude::*;
use anchor_lang::solana_program::{pubkey::Pubkey, rent::Rent};
use crate::{
    state::accounts::AccountData,
    state::products::Product,
    utils::constants::{MAX_DESCRIPTION, MAX_NAME, PRODUCT_ACCOUNT, USER_ACCOUNT},
};

pub fn create_product_(
    ctx: Context<CreateProduct>,
    name: String,
    description: String,
    supply: u32,
    price: u64,
    image_url: String,
    product_url: String,
) -> Result<()> {
    let signer: Pubkey = ctx.accounts.authority.key();
    let pda: Pubkey = ctx.accounts.pda.key();
    let balance: u64 = **ctx.accounts.authority.to_account_infos()[0]
        .lamports
        .borrow();
    let total_amount: u64 = Rent::default().minimum_balance(Product::SIZE);
    let (pda_product, bump) = Pubkey::find_program_address(&[&signer.to_bytes()], ctx.program_id);

    // validate input & balances
    require_keys_eq!(pda, pda_product);
    require_gte!(balance, total_amount);
    require_gte!(MAX_NAME, name.len());
    require_gte!(MAX_DESCRIPTION, description.len());
    require_gt!(supply, 0);

    // update state
    let product_account: &mut Account<Product> = &mut ctx.accounts.product_account;
    let user_account: &mut Account<AccountData> = &mut ctx.accounts.user_account;
    user_account.add_product(pda_product);
    product_account.set_bump_original(bump);
    product_account.set_authority(signer);
    product_account.set_name(name);
    product_account.set_description(description);
    product_account.set_supply(supply);
    product_account.set_price(price);
    product_account.set_image_url(image_url);
    product_account.set_product_url(product_url);

    Ok(())
}

#[derive(Accounts)]
#[instruction(image_url: String, product_url: String)]
pub struct CreateProduct<'info> {
    #[account(mut, signer)]
    pub authority: AccountInfo<'info>,

    #[account(mut, seeds = [USER_ACCOUNT], bump = user_account.bump_original)]
    pub user_account: Account<'info, AccountData>,

    #[account(
        init,
        seeds = [&PRODUCT_ACCOUNT[..], &authority.key().to_bytes()[..]],
        bump,
        payer = authority,
        space = Product::SIZE + image_url.len() + product_url.len())]
    pub product_account: Account<'info, Product>,

    #[account(mut)]
    pub pda: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
