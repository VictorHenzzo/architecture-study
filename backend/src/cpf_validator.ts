export function isValidCpf(cpf: string) {
    if (!cpf) return false
    cpf = sanitizeCpf(cpf)
    if (cpfHasInvalidLenght(cpf)) return false
    if (allDigitsAreTheSame(cpf)) return false
    const dg1 = calculateDigit(cpf, 10)
    const dg2 = calculateDigit(cpf, 11)
    return extractActualCheckDigit(cpf) === `${dg1}${dg2}`
}

function sanitizeCpf(cpf: string) {
    let asd = ''
    return cpf.replace(/\D/g, '')
}

function cpfHasInvalidLenght(cpf: string) {
    return cpf.length !== 11
}

function allDigitsAreTheSame(cpf: string) {
    return cpf.split('').every((c) => c === cpf[0])
}

function calculateDigit(cpf: string, factor: number) {
    let total = 0
    for (const digit of cpf) {
        if (factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
}

function extractActualCheckDigit(cpf: string) {
    return cpf.slice(9)
}
