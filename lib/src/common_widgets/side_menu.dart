import 'package:flutter/material.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 326.0,
      height: double.infinity,
      color: Theme.of(context).primaryColor,
      child: Column(children: [
        _SideMenuOption(icon: Icons.home, title: "Home", onTap: () {}),
        _SideMenuOption(icon: Icons.balance, title: "Accounts", onTap: () {})
      ]),
    );
  }
}

class _SideMenuOption extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;

  const _SideMenuOption(
      {Key? key, required this.icon, required this.title, required this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
        leading: Icon(
          icon,
          size: 28.0,
        ),
        title: Text(title, overflow: TextOverflow.ellipsis),
        onTap: onTap);
  }
}
