use crate::{state::accounts::*, utils::constants::USER_ACCOUNT};
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};

pub fn init_user_account_(ctx: Context<InitUserAccount>) -> Result<()> {
    let program_id: &Pubkey = ctx.program_id;
    let user_account: &mut Account<AccountData> = &mut ctx.accounts.user_account;
    let (_pda, bump): (Pubkey, u8) = Pubkey::find_program_address(&[USER_ACCOUNT], program_id);
    user_account.set_bump_original(bump);
    user_account.init_product_list();

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct InitUserAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_ACCOUNT],
        bump,
        payer = authority,
        space = AccountData::SIZE
    )]
    pub user_account: Account<'info, AccountData>,

    pub system_program: Program<'info, System>,
}