use crate::utils::{ANCHOR_BUFFER, MAX_DESCRIPTION, MAX_NAME};
use anchor_lang::prelude::*;

#[account]
pub struct Product {
    pub bump_original: u8,   // 1
    pub authority: Pubkey,   // 32
    pub active: bool,        // 1
    pub name: String,        // 4 + MAX_NAME
    pub description: String, // 4 + MAX_DESCRIPTION
    pub product_url: String, // 4
}

impl Product {
    pub const SIZE: usize =
        1 + 32 + 1 + 4 + MAX_NAME + 4 + MAX_DESCRIPTION + 4 + ANCHOR_BUFFER;

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

    pub fn set_product_url(&mut self, product_url: String) {
        self.product_url = product_url;
    }

}
