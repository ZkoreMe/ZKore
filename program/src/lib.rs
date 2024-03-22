pub mod marketplace;
pub mod account;

pub use account::*;

use anchor_lang::prelude::*;

/// Entrypoint for initializing the program.
pub fn initialize(program_id: &Pubkey) -> ProgramResult {
    let accounts = &[AccountMeta::new(*program_id, false)];
    let ix = anchor_lang::solana_program::instruction::Instruction {
        program_id: *program_id,
        accounts: vec![],
        data: vec![],
    };
    anchor_lang::solana_program::program::invoke(&ix, accounts)?;
    Ok(())
}
