package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) {
        String jdbcUrl = "jdbc:mariadb://localhost:3306/java_pd112";
        String username = "root";
        String password = "123456";

        // SQL statement to create the 'category' table
        String createTableSQL = "CREATE TABLE IF NOT EXISTS category (" +
                "id INT PRIMARY KEY AUTO_INCREMENT," +
                "name VARCHAR(255) NOT NULL," +
                "description VARCHAR(500)," +
                "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                ")";
        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
             Statement statement = connection.createStatement()) {
            // Execute the SQL statement to create the table
            statement.executeUpdate(createTableSQL);
            System.out.println("Table 'category' created successfully.");

        } catch (SQLException e) {
            System.out.println("Error working database");
        }
    }
}