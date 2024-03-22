use anchor_lang::prelude::*;

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
