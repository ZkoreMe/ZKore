use crate::utils::{ANCHOR_BUFFER, MAX_DESCRIPTION, MAX_NAME, MAX_VECTOR};
use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Product {
    pub bump_original: u8,   // 1
    pub authority: Pubkey,   // 32
    pub active: bool,        // 1
    pub name: String,        // 4 + MAX_NAME
    pub description: String, // 4 + MAX_DESCRIPTION
    pub score: f32,          // 4
    pub supply: u32,         // 4
    pub price: u64,          // 8
    pub image_url: String,   // 4
    pub product_url: String, // 4
    pub reviews: Vec<Pubkey>,// 4 + MAX_VECTOR (311 products)
}

impl Product {
    pub const SIZE: usize =
        1 + 32 + 1 + 4 + MAX_NAME + 4 + MAX_DESCRIPTION + 4 + 8 + 4 + 4 + 4 + MAX_VECTOR + ANCHOR_BUFFER;

    pub fn set_bump_original(&mut self, bump: u8) {
        self.bump_original = bump;
    }

    pub fn set_authority(&mut self, authority: Pubkey) {
        self.authority = authority;
    }

    pub fn set_name(&mut self, name: String) {
        self.name = name;
    }

    pub fn set_description(&mut self, description: String) {
        self.description = description;
    }

    pub fn set_supply(&mut self, supply: u32) {
        self.supply = supply;
    }

    pub fn set_price(&mut self, price: u64) {
        self.price = price;
    }

    pub fn set_image_url(&mut self, image_url: String) {
        self.image_url = image_url;
    }

    pub fn set_product_url(&mut self, product_url: String) {
        self.product_url = product_url;
    }

    pub fn add_review(&mut self, review: Pubkey) {
        self.reviews.push(review);
    }

    pub fn update_supply(&mut self, supply: u32) {
        self.supply += supply;
    }
}