use anchor_lang::prelude::*;

declare_id!("FJjeymKqhmiWE2CPHkYUmNd6Q2cSCf7cPj76jnRhkeHo");

#[program]
pub mod lab5 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_favorites(ctx: Context<SetFavorites>, color: String, number: u64, hobbies: Vec<String>) -> Result<()>{
        
        let user_pubkey = ctx.accounts.user.key();

        msg!("Setting favorites");
        msg!("Program id: {}", ctx.program_id);
        msg!("Setting: {}'s favorite number to {} and color to {}", user_pubkey, number, color);
        msg!("Hobbies: {:?}", hobbies);
        ctx.accounts.favorites.set_inner(Favorites { color: (color), number: (number), hobbies: (hobbies) });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct SetFavorites<'info>{

    #[account(mut)]
    pub user: Signer<'info>, 
    #[account(
        init,
        payer = user,
        seeds = [b"favorites", user.key().as_ref()],
        space = 8 + Favorites::INIT_SPACE,
        bump
    )]
    pub favorites: Account<'info, Favorites>,
    pub system_program: Program<'info, System>,

}

#[account]
#[derive(InitSpace)]
pub struct Favorites{
    #[max_len(50)]
    pub color: String,
    pub number: u64,
    #[max_len(5,50)]
    pub hobbies: Vec<String>,
}
