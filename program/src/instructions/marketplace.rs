use anchor_lang::prelude::*;
use crate::account::{AccountData, Product};

#[program]
mod marketplace {
    use super::*;

    pub fn create_product(ctx: Context<CreateProduct>, name: String, description: String, supply: u32, price: u64, image_url: String) -> ProgramResult {
        let account_data = &mut ctx.accounts.account_data;
        let product_account = &mut ctx.accounts.product;

        // Your logic for creating a new product
        product_account.set_bump_original(account_data.bump_original);
        product_account.set_authority(ctx.accounts.authority.key());
        product_account.set_active(true);
        product_account.set_name(name);
        product_account.set_description(description);
        product_account.set_supply(supply);
        product_account.set_price(price);
        product_account.set_image_url(image_url);

        account_data.add_product(ctx.accounts.product.key());
        account_data.add_transactions();

        Ok(())
    }

    // Add other program instructions here...
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

const MAX_NAME: usize = 32;
const MAX_DESCRIPTION: usize = 256;
const MAX_PRODUCTS: usize = 311;
const ANCHOR_BUFFER: usize = 16; // Adjust this value as needed
