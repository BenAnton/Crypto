interface PortfolioTotalsProps {
    total: number
}

function PortfolioTotals({total}: PortfolioTotalsProps) {
    return (
        <div>
            <p>Total Value: {" "}
                {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </p>
            <p>Chart Showing breakdown</p>
        </div>
    )
}

export default PortfolioTotals  