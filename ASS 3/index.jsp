<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity Bill Calculator - Java Servlet & JSP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container-main {
            max-width: 700px;
            width: 100%;
        }
        
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        
        .card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border: none;
        }
        
        .card-header h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .card-header small {
            display: block;
            margin-top: 10px;
            opacity: 0.9;
            font-size: 14px;
        }
        
        .card-body {
            padding: 40px;
        }
        
        .form-label {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }
        
        .form-control {
            border-radius: 8px;
            border: 2px solid #e0e0e0;
            padding: 12px 15px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        
        .btn-calculate {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            padding: 12px 30px;
            font-weight: 600;
            border-radius: 8px;
            width: 100%;
            font-size: 16px;
            transition: all 0.3s ease;
            color: white;
        }
        
        .btn-calculate:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
            color: white;
            text-decoration: none;
        }
        
        .alert-error {
            border-radius: 8px;
            border: none;
            margin-bottom: 20px;
            animation: slideIn 0.3s ease;
        }
        
        .result-section {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 30px;
            margin-top: 20px;
            animation: slideIn 0.3s ease;
            border: 2px solid #e0e0e0;
        }
        
        .result-item {
            margin-bottom: 20px;
        }
        
        .result-item:last-child {
            margin-bottom: 0;
        }
        
        .result-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .result-value {
            font-size: 32px;
            font-weight: 700;
            color: #667eea;
        }
        
        .bill-amount {
            color: #28a745;
            font-size: 36px;
        }
        
        .tariff-info {
            background: #e7f3ff;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
            font-size: 14px;
            color: #333;
        }
        
        .tariff-info h6 {
            color: #667eea;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .tariff-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #cce5ff;
        }
        
        .tariff-row:last-child {
            border-bottom: none;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 576px) {
            .card-body {
                padding: 25px;
            }
            
            .card-header h1 {
                font-size: 22px;
            }
            
            .result-value {
                font-size: 24px;
            }
            
            .bill-amount {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>
    <div class="container-main">
        <div class="card">
            <div class="card-header">
                <h1>
                    <i class="bi bi-lightning-charge-fill"></i>
                    Electricity Bill Calculator
                </h1>
                <small>Java Servlet & JSP Version</small>
            </div>
            
            <div class="card-body">
                <!-- Error Message -->
                <%
                    String error = (String) request.getAttribute("error");
                    if (error != null && !error.isEmpty()) {
                %>
                    <div class="alert alert-danger alert-error" role="alert">
                        <i class="bi bi-exclamation-circle"></i> <%= error %>
                    </div>
                <%
                    }
                %>
                
                <!-- Calculation Form -->
                <form method="POST" action="calculate-bill">
                    <div class="mb-3">
                        <label for="consumption" class="form-label">
                            <i class="bi bi-lightning"></i> Electricity Consumption (Units)
                        </label>
                        <input 
                            type="number" 
                            class="form-control" 
                            id="consumption" 
                            name="consumption" 
                            placeholder="Enter units consumed" 
                            step="0.01"
                            min="0"
                            value="<%
                                String consumption = (String) request.getAttribute("consumption");
                                if (consumption != null) {
                                    out.print(consumption);
                                }
                            %>"
                            required
                        >
                        <small class="text-muted">Enter the total units consumed this month</small>
                    </div>
                    
                    <button type="submit" class="btn btn-calculate">
                        <i class="bi bi-calculator"></i> Calculate Bill
                    </button>
                </form>
                
                <!-- Result Section -->
                <%
                    Double units = (Double) request.getAttribute("units");
                    Double bill = (Double) request.getAttribute("bill");
                    if (units != null && bill != null) {
                %>
                    <div class="result-section">
                        <div class="result-item">
                            <div class="result-label">Total Consumption</div>
                            <div class="result-value">
                                <%= String.format("%.2f", units) %> Units
                            </div>
                        </div>
                        <hr>
                        <div class="result-item">
                            <div class="result-label">Total Bill Amount</div>
                            <div class="result-value bill-amount">
                                ₹<%= String.format("%.2f", bill) %>
                            </div>
                        </div>
                    </div>
                <%
                    }
                %>
                
                <!-- Tariff Information -->
                <div class="tariff-info">
                    <h6>
                        <i class="bi bi-info-circle"></i> Current Tariff Structure
                    </h6>
                    <div class="tariff-row">
                        <span>First 50 units</span>
                        <span><strong>₹3.50/unit</strong></span>
                    </div>
                    <div class="tariff-row">
                        <span>Next 100 units (51-150)</span>
                        <span><strong>₹4.00/unit</strong></span>
                    </div>
                    <div class="tariff-row">
                        <span>Next 100 units (151-250)</span>
                        <span><strong>₹5.20/unit</strong></span>
                    </div>
                    <div class="tariff-row">
                        <span>Above 250 units</span>
                        <span><strong>₹6.50/unit</strong></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
