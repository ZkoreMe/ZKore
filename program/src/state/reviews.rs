use anchor_lang::prelude::*;
use crate::utils::{ANCHOR_BUFFER, MAX_DESCRIPTION, MAX_NAME};

#[account]
#[derive(Default, Debug, PartialEq)]
pub struct Review {
    // Define fields for the review
    pub bump_original: u8,   // 1
    pub authority: Pubkey,   // 32
    pub name: String,        // 4 + MAX_NAME
    pub description: String, // 4 + MAX_DESCRIPTION
    pub rating: f32,         // 4
    pub product_url: String, // 4

}

impl Review {
    pub const SIZE: usize = 1 + 32 + 4 + MAX_NAME + 4 + MAX_DESCRIPTION + 4 + 4 + ANCHOR_BUFFER;

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

    pub fn set_rating(&mut self, rating: f32) {
        self.rating = rating;
    }

    pub fn set_product_url(&mut self, product_url: String) {
        self.product_url = product_url;
    }
}
