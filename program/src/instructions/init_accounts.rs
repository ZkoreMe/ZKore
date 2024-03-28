use crate::{state::accounts::*, utils::constants::MAIN_ACCOUNT};
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};

pub fn init_global_account(ctx: Context<InitUserAccount>) -> Result<()> {
    let program_id: &Pubkey = ctx.program_id;
    let main_account: &mut Account<AccountData> = &mut ctx.accounts.main_account;
    let (_pda, bump): (Pubkey, u8) = Pubkey::find_program_address(&[MAIN_ACCOUNT], program_id);
    main_account.set_bump_original(bump);
    main_account.init_product_list();

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct InitUserAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [MAIN_ACCOUNT],
        bump,
        payer = authority,
        space = AccountData::SIZE
    )]
    pub main_account: Account<'info, AccountData>,

    pub system_program: Program<'info, System>,
}