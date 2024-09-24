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
                Privacy Policy for CreatorX
            </div>
            <div
                className="w-full p-3 rounded-xl mt-6"
                style={{ backgroundColor: "#FFFFFF40" }}
            >
                <div style={{ fontWeight: "bold" }}>
                    Effective Date: Sep 23rd, 2024
                </div>
                <br />
                Welcome to CreatorX! Your privacy is important to us. This Privacy Policy
                outlines how CreatorX ("we," "our," or "us") collects, uses, and protects your
                personal information when you visit and interact with our website{" "}
                <a href="https://mycreatorx.com">https://mycreatorx.com</a> ("Website") and
                use our services ("Services"). By accessing or using our Website and Services,
                you agree to the terms of this Privacy Policy.
                <br />
                <br />
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    1. Information We Collect
                </div>
                <br />
                <span style={{ fontWeight: "700" }}>1.1 Personal Information</span> We collect
                personal information that you provide directly to us when you register for an
                account, use our Services, or communicate with us. This information may
                include:
                <br />
                <div className="ms-6">
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Billing information</li>
                        <li>Account credentials</li>
                    </ul>
                </div>
                <span style={{ fontWeight: "700" }}>1.2 Caller Information</span> When your AI
                twin interacts with a caller, we may collect Caller Information, including:
                <ul className="ms-6">
                    <li>Caller’s name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Other information provided by the caller during interactions</li>
                </ul>
                <span style={{ fontWeight: "700" }}>1.3 Usage Information</span> We
                automatically collect information about your use of the Website and Services,
                such as:
                <ul className="ms-6">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Pages viewed</li>
                    <li>Time spent on pages</li>
                    <li>Referring website</li>
                </ul>
                <span style={{ fontWeight: "700" }}>1.4 Cookies and Tracking Technologies</span>{" "}
                We use cookies and similar tracking technologies to track the activity on our
                Website and hold certain information. You can control or reset your cookies
                through your browser settings.
                <br />
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    2. How We Use Your Information
                </div>
                <br />
                We use the information we collect for various purposes, including to:
                <ul className="ms-6">
                    <li>Provide, operate, and maintain our Website and Services</li>
                    <li>Improve, personalize, and expand our Services</li>
                    <li>
                        Process transactions and send related information, including purchase
                        confirmations and invoices
                    </li>
                    <li>
                        Communicate with you, including sending updates, marketing materials, and
                        support messages
                    </li>
                    <li>
                        Monitor and analyze usage and trends to improve your experience
                    </li>
                    <li>
                        Detect, prevent, and address technical issues and security breaches
                    </li>
                    <li>Comply with legal obligations and enforce our Terms and Conditions</li>
                </ul>
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    3. How We Share Your Information
                </div>
                <br />
                We do not share your personal information with third parties except in the
                following situations:
                <ul className="ms-6">
                    <li>
                        <span style={{ fontWeight: "700" }}>Service Providers:</span> We may share
                        your information with third-party service providers who perform services
                        on our behalf, such as payment processing, data analysis, and marketing
                        services.
                    </li>
                    <li>
                        <span style={{ fontWeight: "700" }}>Legal Requirements:</span> We may
                        disclose your information if required to do so by law or in response to
                        valid requests by public authorities (e.g., a court or a government
                        agency).
                    </li>
                    <li>
                        <span style={{ fontWeight: "700" }}>Business Transfers:</span> If we are
                        involved in a merger, acquisition, or asset sale, your information may be
                        transferred as part of that transaction.
                    </li>
                    <li>
                        <span style={{ fontWeight: "700" }}>With Your Consent:</span> We may share
                        your information with your consent or at your direction.
                    </li>
                </ul>
                <div style={{ fontWeight: "700", fontSize: 20 }}>4. Data Security</div>
                <br />
                We use administrative, technical, and physical security measures to protect
                your personal information. However, no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to
                use commercially acceptable means to protect your personal information, we
                cannot guarantee its absolute security.
                <div style={{ fontWeight: "700", fontSize: 20 }}>5. Your Rights and Choices</div>
                <br />
                <span style={{ fontWeight: "700" }}>5.1 Access and Update Your Information</span>{" "}
                You can access and update your personal information through your account
                settings or by contacting us at hello@mycreatorx.com.
                <br />
                <span style={{ fontWeight: "700" }}>5.2 Opt-Out of Communications</span> You may
                opt-out of receiving promotional emails from us by following the unsubscribe
                instructions included in those emails. You may also contact us to be removed
                from our email list.
                <br />
                <span style={{ fontWeight: "700" }}>5.3 Data Deletion</span> You may request the
                deletion of your personal information at any time by contacting us at{" "}
                <a href="mailto:hello@mycreatorx.com">hello@mycreatorx.com</a>. We will
                process your request in accordance with applicable laws.
                <br />
                <div style={{ fontWeight: "700", fontSize: 20 }}>6. Children’s Privacy</div>
                <br />
                Our Services are not intended for individuals under the age of 18. We do not
                knowingly collect personal information from anyone under the age of 18. If you
                are a parent or guardian and you are aware that your child has provided us
                with personal information, please contact us immediately.
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    7. International Data Transfers
                </div>
                <br />
                We may transfer your information to, and process it in, countries other than
                the country in which you reside. These countries may have data protection laws
                that are different from the laws of your country. We ensure that your
                information is adequately protected in these jurisdictions.
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    8. Changes to This Privacy Policy
                </div>
                <br />
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page. You are advised to
                review this Privacy Policy periodically for any changes. Changes to this
                Privacy Policy are effective when they are posted on this page. If we make
                significant changes to this Privacy Policy, we will notify you via email or a
                prominent notice on our Website.
                <div style={{ fontWeight: "700", fontSize: 20 }}>9. Third-Party Links</div>
                <br />
                Our Website and Services may contain links to third-party websites. This
                Privacy Policy does not apply to those websites. We encourage you to review
                the privacy policies of any third-party websites you visit, as we are not
                responsible for their content, privacy practices, or policies.
                <div style={{ fontWeight: "700", fontSize: 20 }}>10. Data Retention</div>
                <br />
                We retain your personal information for as long as your account is active or
                as needed to provide you with our Services. We will also retain and use your
                information to comply with our legal obligations, resolve disputes, and
                enforce our agreements. If you request deletion of your information, we will
                remove it from our systems, except where we are required by law to retain it.
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    11. Jurisdiction and Cross-Border Transfers
                </div>
                <br />
                This Privacy Policy shall be governed by and construed in accordance with the
                laws of the State of California, United States. If you are accessing our
                Services from outside of this jurisdiction, your information may be
                transferred to, stored, and processed in the jurisdiction where our data
                centers or our service providers are located.
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    12. Your Rights Under the GDPR (For EU Residents)
                </div>
                <br />
                If you are a resident of the European Union, you have the following rights
                under the General Data Protection Regulation (GDPR):
                <ul className="ms-6">
                    <li>Right to Access: You have the right to request copies of your personal data.</li>
                    <li>
                        Right to Rectification: You have the right to request that we correct any
                        information you believe is inaccurate.
                    </li>
                    <li>
                        Right to Erasure: You have the right to request that we erase your personal
                        data, under certain conditions.
                    </li>
                    <li>
                        Right to Restrict Processing: You have the right to request that we restrict
                        the processing of your personal data, under certain conditions.
                    </li>
                    <li>
                        Right to Object to Processing: You have the right to object to our processing
                        of your personal data, under certain conditions.
                    </li>
                    <li>
                        Right to Data Portability: You have the right to request that we transfer your
                        personal data to another organization, or directly to you, under certain
                        conditions.
                    </li>
                </ul>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:hello@mycreatorx.com">hello@mycreatorx.com</a>. We will respond
                to your request within one month.
                <div style={{ fontWeight: "700", fontSize: 20 }}>
                    13. CCPA Privacy Rights (For California Residents)
                </div>
                <br />
                If you are a resident of California, you have the following rights under the
                California Consumer Privacy Act (CCPA):
                <ul className="ms-6">
                    <li>
                        <span style={{ fontWeight: "700" }}>Right to Know:</span> You have the right
                        to request that we disclose the categories and specific pieces of personal
                        data we have collected about you.
                    </li>
                    <li>
                        <span style={{ fontWeight: "700" }}>Right to Delete:</span> You have the right
                        to request that we delete any personal information we have collected from
                        you, subject to certain exceptions.
                    </li>
                    <li>
                        <span style={{ fontWeight: "700" }}>Right to Opt-Out:</span> You have the right
                        to opt-out of the sale of your personal data. Note: We do not sell personal
                        data.
                    </li>
                    <li>
                        <span style={{ fontWeight: "700" }}>Right to Non-Discrimination:</span> You
                        have the right not to receive discriminatory treatment for exercising your
                        CCPA privacy rights.
                    </li>
                </ul>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:hello@mycreatorx.com">hello@mycreatorx.com</a>. We will verify
                your request and respond within 45 days.
                <div style={{ fontWeight: "700", fontSize: 20 }}>14. Contact Us</div>
                <br />
                If you have any questions, concerns, or requests regarding this Privacy Policy,
                or if you would like to exercise your rights, please contact us at:
                <br />
                Email: <a href="mailto:hello@mycreatorx.com">hello@mycreatorx.com</a>.
                <br />
                We are committed to resolving any issues you may have regarding your privacy
                and the use of your personal information.
                <div style={{ fontWeight: "700", fontSize: 20 }}>15. Acceptance of This Privacy Policy</div>
                <br />
                By using our Website and Services, you signify your acceptance of this Privacy
                Policy. If you do not agree to this Privacy Policy, please do not use our
                Website or Services. Your continued use of the Website following the posting
                of changes to this Privacy Policy will be deemed your acceptance of those
                changes.
            </div>

        </div>
    )
}

export default Page