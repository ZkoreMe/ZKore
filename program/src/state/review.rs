// review.rs
use crate::utils::{ANCHOR_BUFFER, MAX_DESCRIPTION, MAX_NAME};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Review {
    // Define fields for the review
    pub authority: Pubkey,   // 32
    pub rating: u8,          // 1
    pub description: String, // 4 + MAX_DESCRIPTION
    // Add other fields as needed
}

impl Review {
    pub const SIZE: usize =
        1 + 32 + 1 + 4 + MAX_DESCRIPTION + ANCHOR_BUFFER;

    pub fn set_bump_original(&mut self, bump: u8) {
        self.bump_original = bump;
    }

    pub fn set_authority(&mut self, authority: Pubkey) {
        self.authority = authority;
    }

    pub fn set_description(&mut self, description: String) {
        self.description = description;
    }
}