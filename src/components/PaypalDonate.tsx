import React from "react";

interface PaypalDonateProps {
  className?: string;
  formClassName?: string;
  children: React.ReactNode;
}

const PaypalDonate = ({ className, formClassName = "inline-block", children }: PaypalDonateProps) => {
  return (
    <form 
      action="https://www.paypal.com/donate" 
      method="post" 
      target="_blank" 
      className={`m-0 ${formClassName}`}
    >
      <input type="hidden" name="hosted_button_id" value="KK8RES9ZFEK98" />
      <button 
        type="submit" 
        className={`${className} outline-none border-none cursor-pointer`}
      >
        {children}
      </button>
    </form>
  );
};

export default PaypalDonate;
