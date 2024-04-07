use anchor_lang::prelude::*;
use solana_program::sysvar::clock::Clock;

pub fn sign_message_(_ctx: Context<SignMessage>) -> Result<()> {
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
pub struct SignMessage<'info> {
    #[account(mut, signer)]
    pub signer: AccountInfo<'info>,
}

#[event]
pub struct MessageSigned {
    pub message: String,
    pub timestamp: i64,
}
