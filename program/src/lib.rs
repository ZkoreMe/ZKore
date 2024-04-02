use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod utils;

use crate::instructions::*;

declare_id!("");

#[program]
pub mod zkore {
    use super::*;
    pub fn init_user_account(ctx: Context<InitUserAccount>) -> Result<()> {
        init_user_account_(ctx)
    }

    pub fn create_product(
        ctx: Context<CreateProduct>,
        name: String,
        description: String,
        supply: u32,
        price: u64,
        image_url: String,
        product_url: String,
    ) -> Result<()> {
        create_product_(
            ctx,
            name,
            description,
            supply,
            price,
            image_url,
            product_url,
        )
    }

    pub fn create_review(
        ctx: Context<CreateReview>,
        name: String,
        description: String,
        product_url: String,
    ) -> Result<()> {
        create_review_(ctx, name, description, product_url)
    }

    pub fn buy_product(ctx: Context<BuyProduct>) -> Result<String> {
        buy_product_(ctx)
    }
}
