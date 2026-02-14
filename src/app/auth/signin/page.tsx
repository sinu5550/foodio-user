export default function SignInPage() {
  return (
    <form className="space-y-4 w-full">
      <div className="space-y-2">
        <label className="text-[14px] font-medium text-brand-green font-brand-manrope block">Email</label>
        <input 
          type="email" 
          placeholder="name@example.com" 
          className="w-full h-[36px] bg-white px-[12px] py-[4px] rounded-[6px] border border-brand-green/10 focus:border-brand-green/30 focus:outline-none transition-all placeholder:text-brand-green/20 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-medium text-brand-green font-brand-manrope block">Password</label>
        <input 
          type="password" 
          placeholder="" 
          className="w-full h-[36px] bg-white px-[12px] py-[4px] rounded-[6px] border border-brand-green/10 focus:border-brand-green/30 focus:outline-none transition-all text-sm"
        />
      </div>

      <button className="w-full bg-brand-green text-white py-2 rounded-[40px] text-[16px] font-medium hover:bg-brand-green/95 transition-all shadow-[0_12px_24px_-8px_rgba(26,60,52,0.3)]">
        Sign In
      </button>
    </form>
    
  );
}
