use anchor_lang::prelude::*;

#[constant]
pub const ANCHOR_BUFFER: usize = 8;

#[constant]
pub const MAIN_ACCOUNT: &[u8; 12] = b"MAIN_ACCOUNT";

#[constant]
pub const MAX_NAME: usize = 32;

#[constant]
pub const MAX_DESCRIPTION: usize = 200;


#[constant]
pub const MAX_VECTOR: usize = 9971;
// why 9971 accounts unless than 10000?
// 9971 = 311 * 32(pubkey) -> the max number of account in the AccountData struct