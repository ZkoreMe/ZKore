use crate::utils::{ANCHOR_BUFFER, MAX_VECTOR};
use anchor_lang::prelude::*;

#[account]
pub struct AccountData {
    pub bump_original: u8,          // 1
    pub transactions: u64,          // 8
    pub average_exchange_time: i64, // 8 (unix time-stamp)
    pub product_list: Vec<Pubkey>,  // 4 + MAX_VECTOR
}

impl AccountData {
    pub const SIZE: usize = 1 + 8 + 8 + ANCHOR_BUFFER;

    pub fn set_bump_original(&mut self, bump: u8) {
        self.bump_original = bump;
    }

    pub fn init_transactions(&mut self) {
        self.transactions = 0;
    }

    pub fn init_av_ex_time(&mut self) {
        self.average_exchange_time = 0; // null time (unixtimestamp metric)
    }

    pub fn init_product_list(&mut self) {
        self.product_list = [].to_vec();
    }

    //add product
    pub fn add_product(&mut self, product: Pubkey) {
        self.product_list.push(product);
    }

    pub fn add_transactions(&mut self) {
        self.transactions += 1;
    }
}