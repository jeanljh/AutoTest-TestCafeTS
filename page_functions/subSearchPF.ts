import { SubSearchPO } from "../page_objects/subSearchPO";

const subSearchPO = new SubSearchPO()

export class SubSearchPF {
    async CalculateTotalPrice() {
        const type = await subSearchPO.lbPerson.textContent.then(s => s.slice(1).split(' ')[0])
        const pax = parseInt(await subSearchPO.lbPassenger.textContent)
        const price = await subSearchPO.lbInfo.nth(1).textContent
            .then(s => parseFloat(s.substring(s.indexOf('$') + 1, s.length)))
        return {
            basic: type === 'max' ? `\$${price.toFixed(2)}` : `${pax}x \$${price.toFixed(2)}`,
            total: type === 'max' ? `\$${price.toFixed(2)}` : `\$${(pax * price).toFixed(2)}`
        }
    }
}