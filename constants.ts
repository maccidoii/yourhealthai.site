
import { Disease } from './types';

export const commonDiseases: Disease[] = [
  {
    name: 'Malaria',
    overview: 'A life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes.',
    symptoms: ['Fever', 'Chills', 'Headache', 'Nausea and vomiting', 'Muscle pain and fatigue'],
    treatment: 'Treatment includes prescription drugs to kill the parasite. The types of drugs and the length of treatment will vary depending on the type of malaria parasite.',
    prevention: 'Avoid mosquito bites by using insect repellent, wearing long-sleeved clothing, and sleeping under a mosquito net. Prophylactic drugs can also be taken before, during, and after travel to an area where malaria is common.'
  },
  {
    name: 'Diabetes Mellitus',
    overview: 'A chronic disease that occurs either when the pancreas does not produce enough insulin or when the body cannot effectively use the insulin it produces.',
    symptoms: ['Frequent urination', 'Increased thirst', 'Unexplained weight loss', 'Extreme hunger', 'Fatigue', 'Blurred vision'],
    treatment: 'Management includes blood sugar monitoring, insulin therapy, oral medications, and lifestyle changes like a healthy diet and regular exercise.',
    prevention: 'Maintaining a healthy body weight, engaging in regular physical activity, and eating a healthy diet can prevent or delay the onset of type 2 diabetes.'
  },
  {
    name: 'Cancer',
    overview: 'A large group of diseases characterized by the uncontrolled growth and spread of abnormal cells. If the spread is not controlled, it can result in death.',
    symptoms: ['Varies greatly by type. May include lumps, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements.'],
    treatment: 'Common treatments include surgery, chemotherapy, radiation therapy, immunotherapy, and targeted therapy.',
    prevention: 'Avoiding tobacco, limiting alcohol, protecting skin from the sun, maintaining a healthy weight, and getting vaccinated against certain viruses (like HPV) can reduce risk.'
  },
  {
    name: 'HIV/AIDS',
    overview: 'Human immunodeficiency virus (HIV) is an infection that attacks the body’s immune system. Acquired immunodeficiency syndrome (AIDS) is the most advanced stage of the disease.',
    symptoms: ['Early stage: Flu-like symptoms. Later stages: Weight loss, fever or night sweats, fatigue, and recurrent infections.'],
    treatment: 'There is no cure for HIV infection. However, with effective antiretroviral therapy (ART), HIV can be controlled and transmission prevented.',
    prevention: 'Using condoms correctly, pre-exposure prophylaxis (PrEP), and not sharing needles are key prevention strategies.'
  },
   {
    name: 'Tuberculosis (TB)',
    overview: 'An infectious disease usually caused by Mycobacterium tuberculosis (MTB) bacteria. Tuberculosis generally affects the lungs, but can also affect other parts of the body.',
    symptoms: ['A persistent cough that lasts more than 3 weeks', 'Coughing up blood or mucus', 'Chest pain', 'Unintentional weight loss', 'Fatigue', 'Fever', 'Night sweats'],
    treatment: 'TB is treatable and curable. It is treated with a standard 6-month course of 4 antimicrobial drugs.',
    prevention: 'Vaccination with the BCG vaccine, good ventilation, and early diagnosis and treatment can prevent the spread of TB.'
  },
   {
    name: 'Influenza (Flu)',
    overview: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.',
    symptoms: ['Fever or feeling feverish/chills', 'Cough', 'Sore throat', 'Runny or stuffy nose', 'Muscle or body aches', 'Headaches', 'Fatigue (tiredness)'],
    treatment: 'Rest, fluids, and over-the-counter medications can help relieve symptoms. Antiviral drugs may be prescribed by a doctor.',
    prevention: 'The most effective way to prevent the flu is by getting a flu vaccine each year.'
  },
  {
    name: 'Hypertension (High Blood Pressure)',
    overview: 'A common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease.',
    symptoms: ['Often has no symptoms. If untreated, it can cause headaches, shortness of breath, or nosebleeds, but these signs and symptoms aren\'t specific.'],
    treatment: 'Lifestyle changes such as a heart-healthy diet with less salt, regular physical activity, and maintaining a healthy weight. Medications may also be necessary.',
    prevention: 'Following a healthy lifestyle helps prevent high blood pressure.'
  }
];
