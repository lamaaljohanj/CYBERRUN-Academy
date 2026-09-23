
const demoResponses = {
    "scenario1": `
        <ul>
            <li><strong>Containment:</strong> Immediately disconnect the affected device from the network (isolate host).</li>
            <li><strong>Eradication:</strong> Reset the compromised employee credentials and run a full antivirus scan.</li>
            <li><strong>Investigation:</strong> Analyze the <em>invoice.exe</em> file in a sandbox to determine what data was accessed.</li>
        </ul>`,
    "scenario2": `
        <ul>
            <li><strong>Forensics:</strong> Review AWS CloudTrail logs to identify which IP addresses accessed the bucket during the 48-hour window.</li>
            <li><strong>Legal:</strong> Consult with legal counsel to determine if the leaked PII triggers GDPR or CCPA notification requirements.</li>
            <li><strong>Remediation:</strong> Enable "Block Public Access" on all S3 buckets and rotate any exposed keys.</li>
        </ul>`,
    "scenario3": `
        <ul>
            <li><strong>MFA Policy:</strong> Mandate App-based Authenticator (e.g., Google Auth) and deprecate SMS due to SIM-swapping risks.</li>
            <li><strong>Complexity:</strong> Enforce 14+ character passphrases rather than complex short passwords.</li>
            <li><strong>Rotation:</strong> Remove mandatory rotation requirements (NIST guideline) unless a compromise is suspected.</li>
        </ul>`
};

async function generateOutline(scenarioId) {
    const responseElement = document.getElementById(scenarioId + 'Response');

    
    const button = document.getElementById('analyzeBtn' + scenarioId.slice(-1));

    if (!responseElement || !button) {
        console.error("Missing elements for ID:", scenarioId);
        return;
    }

    button.disabled = true;
    const originalText = button.innerHTML;
    
    responseElement.innerHTML = '';
    responseElement.classList.add('hidden');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResponse = demoResponses[scenarioId] || "No response defined for this scenario.";
    
    responseElement.innerHTML = `<h5 class="font-bold text-white mb-2 underline decoration-pink-500"> Response Plan:</h5>${mockResponse}`;
    responseElement.classList.remove('hidden');

    button.disabled = false;
    button.innerHTML = originalText;
}


function setupCollapsibleCard(headerId, contentId, chevronId) {
    const header = document.getElementById(headerId);
    const content = document.getElementById(contentId);
    const chevron = document.getElementById(chevronId);
    
    if (!header || !content || !chevron) return; 

    content.style.maxHeight = '0';

    header.addEventListener('click', () => {
        const isExpanded = content.classList.toggle('expanded');
        if (isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px'; 
            chevron.style.transform = 'rotate(180deg)';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'; 
            setTimeout(() => { content.style.maxHeight = '0'; }, 10);
            chevron.style.transform = 'rotate(0deg)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
   
    const introCard = document.getElementById('introCard');
    const hiddenInfo = document.getElementById('hiddenInfo');
    if(hiddenInfo) hiddenInfo.style.display = 'none';
    if(introCard) {
        introCard.addEventListener('click', () => {
            const isHidden = hiddenInfo.style.display === 'none';
            hiddenInfo.style.display = isHidden ? 'block' : 'none';
            introCard.classList.toggle('border-pink-500', isHidden);
            introCard.classList.toggle('border-gray-700', !isHidden);
        });
    }

   
    setupCollapsibleCard('phishingHeader', 'phishingContent', 'phishingChevron');
    setupCollapsibleCard('malwareHeader', 'malwareContent', 'malwareChevron');
    setupCollapsibleCard('ddosHeader', 'ddosContent', 'ddosChevron');
    setupCollapsibleCard('socialEngHeader', 'socialEngContent', 'socialEngChevron');
    setupCollapsibleCard('zeroDayHeader', 'zeroDayContent', 'zeroDayChevron');
});