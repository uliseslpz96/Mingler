import 'package:flutter/material.dart';

class AddScreen extends StatelessWidget {
  const AddScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Agregar', // Título de la pantalla
          style: TextStyle(
            color: Colors.amber, // Color del texto del título
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.grey[900], // Color de fondo del AppBar
        iconTheme: IconThemeData(
            color: Colors.amber), // Color de los íconos del AppBar
        toolbarHeight: 45,
      ),
      body: Center(
        child: Text('Pantalla de Agregar'),
      ),
    );
  }
}
