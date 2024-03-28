use anchor_lang::prelude::*;

#[error_code]
pub enum ZKoreError {
    #[msg("Unauthorized to perform this action.")]
    Unauthorized,
    #[msg("Not allowed")]
    NotAllowed,
}