use anchor_lang::prelude::*;
use solana_program::sysvar::clock::Clock;

pub fn post_(_ctx: Context<Post>) -> Result<()> {
    msg!("Confirm Review Post");

    let current_timestamp = Clock::get()?.unix_timestamp;

    // Emit an event to indicate that the message has been signed
    emit!(ReviewPosted {
        message: "Confirm Review Post".to_string(),
        timestamp: current_timestamp,
    });
    Ok(())
}

#[derive(Accounts)]
pub struct Post {}

#[event]
pub struct ReviewPosted {
    pub message: String,
    pub timestamp: i64,
}
