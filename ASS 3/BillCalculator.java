/**
 * BillCalculator Servlet
 * Handles electricity bill calculation based on tariff slabs
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/calculate-bill")
public class BillCalculator extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        
        String consumptionStr = request.getParameter("consumption");
        String errorMessage = null;
        Double bill = null;
        Double units = null;

        // Input Validation
        if (consumptionStr == null || consumptionStr.trim().isEmpty()) {
            errorMessage = "Please enter the electricity consumption in units.";
        } else {
            try {
                units = Double.parseDouble(consumptionStr.trim());
                
                if (units < 0) {
                    errorMessage = "Please enter a valid positive number for consumption.";
                } else {
                    bill = calculateBill(units);
                }
            } catch (NumberFormatException e) {
                errorMessage = "Please enter a valid number for consumption.";
            }
        }

        // Set attributes for JSP
        request.setAttribute("consumption", consumptionStr);
        request.setAttribute("error", errorMessage);
        request.setAttribute("units", units);
        request.setAttribute("bill", bill);

        // Forward to JSP
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Forward GET requests to index.jsp
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    /**
     * Calculate electricity bill based on tariff slabs
     * First 50 units – ₹3.50/unit
     * Next 100 units (51-150) – ₹4.00/unit
     * Next 100 units (151-250) – ₹5.20/unit
     * Above 250 units – ₹6.50/unit
     * 
     * @param units Total units consumed
     * @return Total bill amount
     */
    private double calculateBill(double units) {
        double bill = 0;

        if (units <= 50) {
            bill = units * 3.50;
        } else if (units <= 150) {
            bill = (50 * 3.50) + ((units - 50) * 4.00);
        } else if (units <= 250) {
            bill = (50 * 3.50) + (100 * 4.00) + ((units - 150) * 5.20);
        } else {
            bill = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + ((units - 250) * 6.50);
        }

        return Math.round(bill * 100.0) / 100.0;
    }
}
