use anchor_lang::prelude::*;
use solana_program::sysvar::clock::Clock;

pub fn post_(_ctx: Context<Post>) -> Result<()> {
    msg!("Confirm Referral Link Redirect");

    let current_timestamp = Clock::get()?.unix_timestamp;

    // Emit an event to indicate that the message has been signed
    emit!(MessageSigned {
        message: "Confirm Referral Link Redirect".to_string(),
        timestamp: current_timestamp,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct Post<'info> {
    #[account(mut, signer)]
    pub signer: AccountInfo<'info>,
}

#[event]
pub struct MessageSigned {
    pub message: String,
    pub timestamp: i64,
}
