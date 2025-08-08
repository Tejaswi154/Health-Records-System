package com.example.demo.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseCreationUtility {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/";
    private static final String USERNAME = "root"; // Change as per your MySQL username
    private static final String PASSWORD = "123456789";     // Change as per your MySQL password
    private static final String DATABASE_NAME = "petfinder_db";

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD);
             Statement statement = connection.createStatement()) {

            String sql = "CREATE DATABASE IF NOT EXISTS " + DATABASE_NAME + " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
            statement.executeUpdate(sql);
            System.out.println("Database '" + DATABASE_NAME + "' created or already exists.");

        } catch (SQLException e) {
            System.err.println("Failed to create database: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
