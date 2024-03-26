use anchor_lang::prelude::*;
use crate::account_data::AccountData;
use crate::product::Product;

#[program]
mod marketplace {
    use super::*;

    // Create product
    pub fn create_product(ctx: Context<CreateProduct>, url: String) -> ProgramResult {
        let account_data = &mut ctx.accounts.account_data;
        let product_account = &mut ctx.accounts.product;

        // Your logic for creating a new product
        product_account.set_bump_original(account_data.bump_original);
        product_account.set_authority(ctx.accounts.authority.key());
        product_account.set_product_url(url);

        account_data.add_product(ctx.accounts.product.key());
        account_data.add_transactions();

        Ok(())
    }

    // Add other program instructions here...

    // Purchasing a product
    pub fn purchase_product(ctx: Context<PurchaseProduct>) -> ProgramResult {
        let product = &ctx.accounts.product;

        // Redirect URL
        let redirect_url = product.url.clone();

        Ok(redirect_url)
    }
}

#[derive(Accounts)]
pub struct CreateProduct<'info> {
    #[account(mut)]
    pub account_data: Account<'info, AccountData>,
    #[account(init, payer = authority, space = Product::SIZE)]
    pub product: Account<'info, Product>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PurchaseProduct<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub product: Account<'info, Product>,
}

const ANCHOR_BUFFER: usize = 16; // Adjust this value as needed

mod product;
mod account_data;
