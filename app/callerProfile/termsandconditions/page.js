'use client'
import React, { useEffect, useState } from 'react';

const Page = () => {

    const [screenWidth, setScreenWidth] = useState(false);
    const [highScreen, setHighScreen] = useState(false);

    //check if the screen is small
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth <= 950);
        };

        handleResize();

        // Add the event listener for window resizing
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='h-screen ld:w-10/12 w-11/12 px-4 pb-4 text-justify' style={{
            backgroundColor: "#ffffff40",
            overflowY: 'scroll',
            msOverflowStyle: 'none', /* Hide scrollbar in IE and Edge */
            scrollbarWidth: 'none', /* Hide scrollbar in Firefox */
        }}>
            <style jsx>{`
                /* Hide scrollbar in Safari and Chrome */
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <div className='mt-10' style={{ fontSize: screenWidth ? 17 : 28, fontWeight: '500', fontFamily: 'inter' }}>
                CreatorX! Terms and Conditions
            </div>
            <div className='w-full p-3 rounded-xl mt-6'
                style={{ backgroundColor: "#FFFFFF40" }}>
                <div style={{ fontWeight: "bold", fontSize: 18 }}> 1. Introduction: </div><br />
                Welcome to CreatorX! These Terms and Conditions ("Terms") govern your use of the CreatorX platform, including any AI-powered twins, features, and services provided by CreatorX ("Service"). By accessing or using CreatorX, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, you may not use the Service.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 2. Eligibility: </div><br />
                To use CreatorX, you must be at least 18 years old and have the legal capacity to enter into a binding agreement. By using the Service, you represent and warrant that you meet these eligibility requirements.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 3. Account Registration: </div><br />
                To access the full features of CreatorX, you must create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 4. Use of the Service: </div><br />
                CreatorX grants you a limited, non-exclusive, non-transferable, and revocable license to use the Service in accordance with these Terms. You agree to use the Service solely for your personal or business purposes as a creator, domain expert, or influencer.
                Prohibited Uses:
                You agree not to:
                Use the Service for any illegal or unauthorized purpose.
                Misrepresent your identity or affiliation with any person or organization.
                Interfere with or disrupt the Service or servers connected to the Service.
                Reverse engineer, decompile, or disassemble any part of the Service.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 5. AI Twin Customization: </div><br />
                CreatorX allows you to customize your AI twin to reflect your unique communication style. You are solely responsible for the content, tone, and behavior of your AI twin. CreatorX reserves the right to review and remove any content or customization that violates these Terms or is deemed inappropriate, at its sole discretion.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 6. Caller Information Collection: </div><br />
                As part of the Service, CreatorX may collect certain information from callers who interact with your AI twin, including their name, email address, and phone number ("Caller Information"). By using the Service, you agree that:
                You will inform callers that their name, email, and phone number will be collected during their interaction with your AI twin.
                Caller Information will be used solely for the purpose of providing and improving the Service and will not be shared with third parties, except as required by law.
                You are responsible for ensuring that your use of Caller Information complies with all applicable data protection and privacy laws.
                Agreement to Receive Communications:
                By entering their phone number or email address in any form on the CreatorX platform, users agree to receive promotional messages, feedback requests, and other communications via SMS and/or email. You may opt out of receiving these communications at any time by following the unsubscribe instructions provided in the messages.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 7. Disclaimer of AI Twin Content: </div><br />
                CreatorX provides tools to customize your AI twin, but you are solely responsible for the content and information your AI twin provides to callers. CreatorX does not guarantee the accuracy, completeness, or appropriateness of any information provided by your AI twin during interactions with callers.
                Limitation of Liability for AI Twin Content:
                CreatorX shall not be liable for any damages, losses, or liabilities arising from the content or information provided by your AI twin to callers.
                You agree to indemnify and hold CreatorX harmless from any claims, liabilities, or damages arising out of or related to the content or information provided by your AI twin.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 8. Pricing and Payment: </div><br />
                CreatorX offers various pricing plans, including a free trial option. By selecting a pricing plan, you agree to pay the fees associated with that plan. All fees are non-refundable except as required by law.
                Payment Terms:
                Payment is due at the time of subscription to a plan.
                If you upgrade or downgrade your plan, the new fee will be applied from the next billing cycle.
                Failure to pay may result in suspension or termination of your access to the Service.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 9. Data Security and Privacy: </div><br />
                CreatorX is committed to protecting your data. We implement advanced security measures to safeguard your personal information and that of your audience, including Caller Information. By using the Service, you consent to the collection, use, and sharing of your data as described in our Privacy Policy.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 10. Intellectual Property: </div><br />
                All content, trademarks, and intellectual property associated with CreatorX are owned by CreatorX or its licensors. You may not use, reproduce, or distribute any CreatorX intellectual property without prior written permission.
                User Content:
                You retain ownership of the content you create and customize within CreatorX. By using the Service, you grant CreatorX a worldwide, royalty-free license to use, reproduce, and display your content solely for the purpose of operating and improving the Service.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 11. Limitation of Liability: </div><br />
                CreatorX provides the Service on an "as-is" and "as-available" basis. CreatorX makes no warranties, express or implied, regarding the Service's performance, reliability, or suitability for your purposes.
                To the maximum extent permitted by law, CreatorX shall not be liable for any indirect, incidental, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or related to your use of the Service.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 12. Indemnification: </div><br />
                You agree to indemnify, defend, and hold harmless CreatorX, its affiliates, and its employees from any claims, liabilities, damages, and expenses (including legal fees) arising out of or related to your use of the Service, your content, or your violation of these Terms.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 13. Termination: </div><br />
                CreatorX reserves the right to suspend or terminate your access to the Service at any time, without notice, for conduct that violates these Terms or is otherwise harmful to other users or the Service.
                You may terminate your account at any time by contacting CreatorX support. Upon termination, you will no longer have access to your account or any content associated with it.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 14. Changes to the Terms: </div><br />
                CreatorX may modify these Terms at any time. We will notify you of any significant changes by posting the updated Terms on the website or by sending you an email. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 15. Governing Law: </div><br />
                These Terms shall be governed by and construed in accordance with the laws of Santa Clara, CA, without regard to its conflict of law principles.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 16. Dispute Resolution: </div><br />
                Any disputes arising out of or related to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the Santa Clara County  Arbitration Association. The arbitration shall take place in Santa Clara, and the decision of the arbitrator shall be final and binding.
                <br /> <br /> <div style={{ fontWeight: "bold", fontSize: 18 }}> 17. Contact Information: </div><br />
                If you have any questions or concerns about these Terms or the Service, please contact us at hello@creatorx.com.

            </div>
        </div>
    )
}

export default Page