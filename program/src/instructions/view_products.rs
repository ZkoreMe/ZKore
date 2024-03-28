use crate::state::{accounts::AccountData, product::Product};
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};
use crate::ID;
use serde_json::{json, Value};

#[derive(Accounts)]
pub struct ViewProducts<'info> {
    #[account(init, payer = authority, space = Product::SIZE * MAX_PRODUCTS)]
    pub accounts: Vec<Account<'info, AccountData>>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn view_products(ctx: Context<ViewProducts>) -> Result<()> {
    // Fetch all accounts
    let accounts = ctx.accounts.accounts.iter();

    // Collect products from each account
    let mut all_products = Vec::new();
    for account in accounts {
        let products = account.get_products();
        all_products.extend_from_slice(&products);
    }

    // Serialize product data into JSON
    let products_json: Vec<Value> = all_products
        .iter()
        .map(|product| {
            json!({
                "name": product.name,
                "description": product.description,
                // Add other fields as needed
            })
        }).collect();

    // Convert JSON data to bytes
    let json_bytes = serde_json::to_vec(&products_json)?;

    // Return JSON data as response
    ctx.accounts.send_response(json_bytes)?;

    // Handle the list of all products as needed
    Ok(())
}
