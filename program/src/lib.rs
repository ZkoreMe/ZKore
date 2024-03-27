// pub mod marketplace;
// pub mod account;
// pub mod product;

// pub use account::*;

// use anchor_lang::prelude::*;

// /// Entrypoint for initializing the program.
// pub fn initialize(program_id: &Pubkey) -> ProgramResult {
//     let accounts = &[AccountMeta::new(*program_id, false)];
//     let ix = anchor_lang::solana_program::instruction::Instruction {
//         program_id: *program_id,
//         accounts: vec![],
//         data: vec![],
//     };
//     anchor_lang::solana_program::program::invoke(&ix, accounts)?;
//     Ok(())
// }
use anchor_lang::prelude::*;
use instructions::*;

pub mod instructions;
pub mod state;
pub mod utils;

declare_id!("");

#[program]
pub mod zkore {
    use super::*;
    pub fn initialize(ctx: Context<InitGlobalAccount>) -> Result<()> {
        initialize(ctx)
    }

}