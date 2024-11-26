function calculateCashFlow() {
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanPeriod = parseFloat(document.getElementById('loanPeriod').value);
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
    const transactionCosts = parseFloat(document.getElementById('transactionCosts').value);

    if (!purchasePrice || !loanAmount || !interestRate || !loanPeriod || !monthlyRent || !transactionCosts) {
        alert("모든 필드를 입력해주세요!");
        return;
    }

    // 대출 월 상환액 계산 (원리금 균등 상환)
    const monthlyInterestRate = interestRate / 12; // 월 이자율
    const totalMonths = loanPeriod * 12; // 총 상환 개월 수
    const monthlyRepayment = 
        loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    // 월, 연간 현금흐름 계산
    const monthlyCashFlow = monthlyRent - monthlyRepayment;
    const annualCashFlow = monthlyCashFlow * 12;

    // 현금흐름 수익률 계산
    const netInvestment = purchasePrice + transactionCosts - loanAmount;
    const cashFlowYield = (annualCashFlow / netInvestment) * 100;

    // 결과 출력
    document.getElementById('results').innerHTML = `
        <p><strong>현금흐름 계산 결과:</strong></p>
        <p>대출 월 상환액: ₩${monthlyRepayment.toLocaleString()}</p>
        <p>월 현금흐름: ₩${monthlyCashFlow.toLocaleString()}</p>
        <p>연간 현금흐름: ₩${annualCashFlow.toLocaleString()}</p>
        <p>현금흐름 수익률: ${cashFlowYield.toFixed(2)}%</p>
    `;
}
