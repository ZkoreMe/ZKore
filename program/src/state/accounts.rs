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

