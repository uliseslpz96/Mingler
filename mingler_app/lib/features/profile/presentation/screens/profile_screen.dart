import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text(
          'Perfil', // Título de la pantalla
          style: TextStyle(
            color: Colors.amber, // Color del texto del título
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.grey[900], // Color de fondo del AppBar
        iconTheme: IconThemeData(
            color: Colors.amber), // Color de los íconos del AppBar
        toolbarHeight: 40,
      ),
      body: Center(
        child: Text('Pantalla de Perfil'),
      ),
    );
  }
}
