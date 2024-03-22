use crate::utils::{ANCHOR_BUFFER, MAX_DESCRIPTION, MAX_NAME, MAX_PRODUCTS};
use anchor_lang::prelude::*;

// this account is reference for data matric globally
#[account]
pub struct AccountData {
    pub bump_original: u8,          // 1
    pub transactions: u64,          // 8
    pub average_exchange_time: i64, // 8 (unix time-stamp)
    pub positioning: Vec<Pubkey>,   // 4 + 9971 (311 products)
}

#[account]
pub struct Product {
    pub bump_original: u8,   // 1
    pub authority: Pubkey,   // 32
    pub active: bool,        // 1
    pub name: String,        // 4 + MAX_NAME
    pub description: String, // 4 + MAX_DESCRIPTION
    pub supply: u32,         // 4
    pub price: u64,          // 8
    pub image_url: String,   // 4
}

impl Product {
    pub const SIZE: usize =
        1 + 32 + 1 + 4 + MAX_NAME + 4 + MAX_DESCRIPTION + 4 + 8 + 4 + ANCHOR_BUFFER;

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

    pub fn update_supply(&mut self, supply: u32) {
        self.supply += supply;
    }
}

impl AccountData {
    pub const SIZE: usize = 1 + 8 + 8 + 4 + MAX_PRODUCTS + ANCHOR_BUFFER;

    pub fn set_bump_original(&mut self, bump: u8) {
        self.bump_original = bump;
    }

    pub fn init_transactions(&mut self) {
        self.transactions = 0;
    }

    pub fn init_av_ex_time(&mut self) {
        self.average_exchange_time = 0; // null time (unixtimestamp metric)
    }

    pub fn init_positioning(&mut self) {
        self.positioning = [].to_vec();
    }

    pub fn add_product(&mut self, product: Pubkey) {
        if self.positioning.len() <= MAX_PRODUCTS {
            self.positioning.push(product);
        } else {
            msg!("Product created, but not in positioning position!");
        }
    }

    pub fn add_transactions(&mut self) {
        self.transactions += 1;
    }
}