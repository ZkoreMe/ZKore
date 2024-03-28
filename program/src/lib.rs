use anchor_lang::prelude::*;

pub mod instructions;
use crate::instructions::init_accounts::*;

declare_id!("");

#[program]
pub mod zkore {
    use super::*;
    pub fn init_global_account(ctx: Context<InitUserAccount>) -> Result<()> {
        init_global_account(ctx)
    }

}