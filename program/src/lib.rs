use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

solana_program::declare_id!("BpfProgram1111111111111111111111111111111111");

entrypoint!(process_intruction);

pub fn process_intruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    intruction_data: &[u8],
) -> ProgramResult {
    msg!(
        "process_intruction: {}: {} accounts, data: {:?}",
        program_id,
        accounts.len(),
        intruction_data
    );

    Ok(())
}
