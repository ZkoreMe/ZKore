use anchor_lang::prelude::*;

pub mod instructions;
use crate::instructions::*;

declare_id!("");

#[program]
pub mod zkore {
    use super::*;
    pub fn init_user_account(ctx: Context<InitUserAccount>) -> Result<()> {
        init_user_account_(ctx)
    }

    pub fn create_product(
        ctx: Context<InitSellOffer>,
        name: String,
        description: String,
        supply: u32,
        price: u64,
        image_url: String,
        product_url: String,
    ) -> Result<()> {
        create_product_(ctx, name, description, supply, price, image_url, product_url)
    }

}