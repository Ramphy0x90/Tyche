import 'package:flutter/material.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final simple = screenWidth < 1100;

    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: BoxDecoration(
            color: Theme.of(context)
                .primaryColor, // Set your desired background color
            borderRadius:
                BorderRadius.circular(16), // Set the desired border radius
            boxShadow: [
              BoxShadow(
                color: Theme.of(context).shadowColor,
                offset: const Offset(0, 2),
                blurRadius: 4,
                spreadRadius: 0,
              ),
            ],
          ),
          width: simple ? 76 : 300,
          height: double.infinity,
          child: Column(children: [
            _SideMenuOption(
                icon: Icons.home, title: "Home", onTap: () {}, simple: simple),
            _SideMenuOption(
                icon: Icons.balance,
                title: "Accounts",
                onTap: () {},
                simple: simple)
          ]),
        ));
  }
}

class _SideMenuOption extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final bool simple;

  const _SideMenuOption(
      {Key? key,
      required this.icon,
      required this.title,
      required this.onTap,
      required this.simple})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
        leading: Icon(
          icon,
          size: 28.0,
        ),
        title: simple ? null : Text(title, overflow: TextOverflow.ellipsis),
        onTap: onTap);
  }
}
