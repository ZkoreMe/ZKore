use anchor_lang::prelude::*;
use solana_program::sysvar::clock::Clock;

#[access_control(sign_message(&ctx))]
pub fn sign_message(ctx: Context<SignMessage>) -> ProgramResult {
    // Emit an instruction to prompt the user to sign a message
    let accounts = &[ctx.accounts.signer];
    let message = b"Confirm Referral Link Redirect";
    let ix = anchor_lang::solana_program::instruction::Instruction {
        program_id: ctx.program_id,
        accounts: accounts.to_vec(),
        data: message.to_vec(),
    };

    // Invoke a system instruction to invoke the instruction to prompt the user to sign
    solana_program::program::invoke_signed(&ix, &[&ctx.accounts.signer], &[])?;

    // Get the current timestamp
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
