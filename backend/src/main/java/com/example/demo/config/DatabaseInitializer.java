package com.example.demo.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Configuration
public class DatabaseInitializer {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String datasourceUsername;

    @Value("${spring.datasource.password}")
    private String datasourcePassword;

    @PostConstruct
    public void createDatabaseIfNotExists() {
        // Extract base URL without database name
        String baseUrl = datasourceUrl.substring(0, datasourceUrl.lastIndexOf("/"));
        String dbName = datasourceUrl.substring(datasourceUrl.lastIndexOf("/") + 1);

        try (Connection connection = DriverManager.getConnection(baseUrl, datasourceUsername, datasourcePassword);
             Statement statement = connection.createStatement()) {

            String sql = "CREATE DATABASE IF NOT EXISTS " + dbName + " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
            statement.executeUpdate(sql);
            System.out.println("Database '" + dbName + "' checked/created successfully.");

        } catch (SQLException e) {
            System.err.println("Failed to create database '" + dbName + "': " + e.getMessage());
            // Optionally rethrow or handle differently
        }
    }
}
