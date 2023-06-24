provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "receivables-api" {
  name     = "receivables-api-resource-group"
  location = "brazilsouth"
}

resource "azurerm_virtual_network" "receivables-api" {
  name                = "receivables-api-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.receivables-api.location
  resource_group_name = azurerm_resource_group.receivables-api.name
}

resource "azurerm_subnet" "receivables-api" {
  name                 = "receivables-api-subnet"
  resource_group_name  = azurerm_resource_group.receivables-api.name
  virtual_network_name = azurerm_virtual_network.receivables-api.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_network_interface" "receivables-api" {
  name                = "receivables-api-nic"
  location            = azurerm_resource_group.receivables-api.location
  resource_group_name = azurerm_resource_group.receivables-api.name

  ip_configuration {
    name                          = "receivables-api-ipconfig"
    subnet_id                     = azurerm_subnet.receivables-api.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_virtual_machine" "receivables-api" {
  name                  = "receivables-api-vm"
  location              = azurerm_resource_group.receivables-api.location
  resource_group_name   = azurerm_resource_group.receivables-api.name
  network_interface_ids = [azurerm_network_interface.receivables-api.id]
  vm_size               = "Standard_DS1_v2"

  storage_os_disk {
    name              = "receivables-api-osdisk"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Premium_LRS"
  }

  storage_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  os_profile {
    computer_name  = "receivables-api-vm"
    admin_username = "admin"
    admin_password = "admin"
  }

  os_profile_linux_config {
    disable_password_authentication = false
  }
}