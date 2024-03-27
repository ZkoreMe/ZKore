use anchor_lang::prelude::*;
use crate::{account_data::AccountData, product::Product, review::Review,};


#[program]
mod marketplace {
    use super::*;

    // Fetch products from all user accounts
    pub fn view_products(ctx: Context<ViewProducts>) -> ProgramResult {
        // Fetch all accounts
        let accounts = ctx.accounts.accounts.iter();

        // Collect products from each account
        let mut all_products = Vec::new();
        for account in accounts {
            let products = account.get_products();
            all_products.extend_from_slice(&products);
        }

        // Handle the list of all products as needed
        Ok(())
    }

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

    // Add review to product
    pub fn add_review(ctx: Context<AddReview>, rating: u8, comment: String) -> ProgramResult {
        let product = &mut ctx.accounts.product;
        let review = Review { rating, comment };
        product.add_review(review);
        Ok(())
    }

    // Purchasing a product
    pub fn purchase_product(ctx: Context<PurchaseProduct>) -> ProgramResult {
        let product = &ctx.accounts.product;

        // Redirect URL
        let redirect_url = product.url.clone();

        Ok(redirect_url)
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

#[derive(Accounts)]
pub struct PurchaseProduct<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub product: Account<'info, Product>,
}

#[derive(Accounts)]
pub struct ViewProducts<'info> {
    #[account(init, payer = authority, space = Product::SIZE * MAX_PRODUCTS)]
    pub accounts: Vec<Account<'info, AccountData>>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

const ANCHOR_BUFFER: usize = 16; // Adjust this value as needed

mod product;
mod account_data;
