import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Check, X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f5f5f5;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlanCard = styled.div`
  background-color: ${props => props.color};
  border-radius: 10px;
  width: 300px;
  padding: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PlanTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
`;

const PlanSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  opacity: 0.8;
`;

const PlanPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 15px;
`;
//font-size: 0.9rem;
const Button = styled.button`
  background-color: white;
  color: ${props => props.color};
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${props => props.color};
    color: white;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${props => props.included ? '#73FC02' : '#FE0303'};
`;

const CustomAlert = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const AlertIcon = styled(AlertCircle)`
  margin-right: 10px;
`;


const plans = [
  {
    title: "Basic Plan",
    price: "₹15,000/year",
    color: "#27ae60",
    features: [
      { name: "Profile Creation and Job Application", included: true },
      { name: "Basic Job Notifications", included: true },
      { name: "Document Upload & Storage (2GB)", included: true },
      { name: "Access to Job Listings (20 jobs/month)", included: true },
      { name: "Skill Matrix for Candidates", included: true },
      { name: "Simple Analytics for Recruiters", included: true },
      { name: "Email Support", included: true },
      { name: "Skill Certification & Ranking", included: false },
      { name: "Advanced Job Matching Algorithm", included: false },
      { name: "Job Tracking Dashboard", included: false },
    ]
  },
  {
    title: "Premium Plan",
    price: "₹30,000/year",
    color: "#f1c40f",
    features: [
      { name: "All Basic Plan Features", included: true },
      { name: "Skill Certification & Ranking", included: true },
      { name: "Advanced Job Matching Algorithm", included: true },
      { name: "Job Tracking Dashboard", included: true },
      { name: "Increased Document Storage (5GB)", included: true },
      { name: "Bulk Candidate Import and Export", included: true },
      { name: "Enhanced Candidate Search", included: true },
      { name: "Document Verification", included: true },
      { name: "Email & Chat Support", included: true },
      { name: "Skill & Profile Enhancement Services", included: false },
      { name: "Priority Job Applications", included: false },
    ]
  },
  {
    title: "VIP Plan",
    price: "₹50,000/year",
    color: "#e74c3c",
    features: [
      { name: "All Premium Plan Features", included: true },
      { name: "Skill & Profile Enhancement Services", included: true },
      { name: "Priority Job Applications", included: true },
      { name: "Unlimited Job Applications", included: true },
      { name: "Interview Scheduling", included: true },
      { name: "Video Portfolio Uploads", included: true },
      { name: "AI-Powered Candidate Matching", included: true },
      { name: "Advanced Bulk Shortlisting", included: true },
      { name: "Video Screening & Interviews", included: true },
      { name: "Priority Support with Dedicated Account Manager", included: true }
    ]
  }
];

const App = () => {
  const [currentPlan, setCurrentPlan] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpZCI6IjEyMzQ1NiIsImlhdCI6MTYwNTgyMjAwMCwiZXhwIjoxNjA1ODI1NjAwfQ.xRpzKvFXP4_eB4z0dUkFjckYvMSEU1RVAV2YseEpTlk"    // Cookies.get('token')
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/plans/current-plan/${userId}`);
        console.log(response.data)
        setCurrentPlan(response.data.planName);
      } catch (err) {
        console.error('Error fetching current plan:', err);
        // Silently handle the error, leaving currentPlan as null
      }
    };

    fetchCurrentPlan();
  }, [userId]);

  const handleBuyPlan = async (planName) => {
    try {
      await axios.post(`http://localhost:5000/api/plans/buy-plan/${userId}`, { planName, email: "ravitejasalva@gmail.com" });
      setCurrentPlan(planName);
    } catch (err) {
      console.error('Error buying plan:', err);
      // Silently handle the error, not updating currentPlan
    }
  };

  return (
    <PlanContainer>
      {plans.map((plan, index) => (
        <PlanCard key={index} color={plan.color}>
          <PlanTitle>{plan.title}</PlanTitle>
          <PlanSubtitle>PER YEAR</PlanSubtitle>
          <PlanPrice>{plan.price}</PlanPrice>
          <FeatureList>
            {plan.features.map((feature, featureIndex) => (
              <FeatureItem key={featureIndex}>
                <IconWrapper included={feature.included}>
                  {feature.included ? <Check size={16} /> : <X size={16} />}
                </IconWrapper>
                {feature.name}
              </FeatureItem>
            ))}
          </FeatureList>
          {currentPlan === plan.title ? (
            <Button color={plan.color} disabled>
              Current Plan
            </Button>
          ) : (
            <Button color={plan.color} onClick={() => handleBuyPlan(plan.title)}>
              Buy Now
            </Button>
          )}
        </PlanCard>
      ))}
    </PlanContainer>
  );
};

export default App;


// import React from 'react';
// import styled from 'styled-components';
// import { Check, X } from 'lucide-react';

// const PlanContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
//   padding: 2rem;
//   background-color: #f5f5f5;

//   @media (max-width: 968px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const PlanCard = styled.div`
//   background-color: ${props => props.color};
//   border-radius: 10px;
//   width: 300px;
//   padding: 1.5rem;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const PlanTitle = styled.h2`
//   font-size: 1.5rem;
//   margin: 0 0 0.5rem 0;
// `;

// const PlanSubtitle = styled.p`
//   font-size: 0.9rem;
//   margin: 0 0 1rem 0;
//   opacity: 0.8;
// `;

// const PlanPrice = styled.p`
//   font-size: 2rem;
//   font-weight: bold;
//   margin: 0 0 1.5rem 0;
// `;

// const FeatureList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin: 0 0 1.5rem 0;
//   flex-grow: 1;
// `;

// const FeatureItem = styled.li`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.5rem;
//   font-size: 0.9rem;
// `;

// const Button = styled.button`
//   background-color: ${props => props.bgcolor};
//   color: ${props => props.color};
//   border: none;
//   padding: 0.75rem;
//   border-radius: 5px;
//   font-size: 1rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: opacity 0.3s ease;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const IconWrapper = styled.span`
//   margin-right: 0.5rem;
//   display: inline-flex;
//   align-items: center;
// `;

// const App = () => {
//   const plans = [
//     {
//       title: "Basic Plan",
//       price: "₹15,000/year",
//       color: "#27ae60",
//       features: [
//         { name: "Profile Creation and Job Application", included: true },
//         { name: "Basic Job Notifications", included: true },
//         { name: "Document Upload & Storage (2GB)", included: true },
//         { name: "Access to Job Listings (20 jobs/month)", included: true },
//         { name: "Skill Matrix for Candidates", included: false },
//         { name: "Simple Analytics for Recruiters", included: false },
//         { name: "Email Support", included: false }
//       ]
//     },
//     {
//       title: "Premium Plan",
//       price: "₹30,000/year",
//       color: "#f1c40f",
//       features: [
//         { name: "All Basic Plan Features", included: true },
//         { name: "Skill Certification & Ranking", included: true },
//         { name: "Advanced Job Matching Algorithm", included: true },
//         { name: "Job Tracking Dashboard", included: true },
//         { name: "Increased Document Storage (5GB)", included: true },
//         { name: "Bulk Candidate Import and Export", included: true },
//         { name: "Enhanced Candidate Search", included: true },
//         { name: "Document Verification", included: false },
//         { name: "Email & Chat Support", included: false }
//       ]
//     },
//     {
//       title: "VIP Plan",
//       price: "₹50,000/year",
//       color: "#e74c3c",
//       features: [
//         { name: "All Premium Plan Features", included: true },
//         { name: "Skill & Profile Enhancement Services", included: true },
//         { name: "Priority Job Applications", included: true },
//         { name: "Unlimited Job Applications", included: true },
//         { name: "Interview Scheduling", included: true },
//         { name: "Video Portfolio Uploads", included: true },
//         { name: "AI-Powered Candidate Matching", included: true },
//         { name: "Advanced Bulk Shortlisting", included: true },
//         { name: "Video Screening & Interviews", included: true },
//         { name: "Priority Support with Dedicated Account Manager", included: true }
//       ]
//     }
//   ];

//   return (
//     <PlanContainer>
//       {plans.map((plan, index) => (
//         <PlanCard key={index} color={plan.color}>
//           <PlanTitle>{plan.title}</PlanTitle>
//           <PlanSubtitle>PER YEAR</PlanSubtitle>
//           <PlanPrice>{plan.price}</PlanPrice>
//           <FeatureList>
//             {plan.features.map((feature, featureIndex) => (
//               <FeatureItem key={featureIndex}>
//                 <IconWrapper>
//                   {feature.included ? <Check size={16} /> : <X size={16} />}
//                 </IconWrapper>
//                 {feature.name}
//               </FeatureItem>
//             ))}
//           </FeatureList>
//           <Button bgcolor="white" color={plan.color}>
//             BUY NOW
//           </Button>
//         </PlanCard>
//       ))}
//     </PlanContainer>
//   );
// };

// export default App;