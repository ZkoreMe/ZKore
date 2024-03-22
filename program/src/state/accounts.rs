use anchor_lang::prelude::*;

#[account]
pub struct AccountData {
    pub bump_original: u8,          // 1
    pub transactions: u64,          // 8
    pub average_exchange_time: i64, // 8 (unix time-stamp)
    pub positioning: Vec<Pubkey>,   // 4 + 9971 (311 products)
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
