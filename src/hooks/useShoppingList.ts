// Custom hook for shopping list management
import { useState, useEffect } from 'react';
import type { 
  ShoppingItem, 
  ShoppingList, 
  Category,
  CreateShoppingItemDto,
  UpdateShoppingItemDto
} from '../types/shopping';
import { shoppingListService } from '../services/shoppingListService';

export const useShoppingList = (userId: string, listId?: string) => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch shopping items
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shoppingListService.getShoppingItems(listId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  // Fetch shopping lists
  const fetchLists = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shoppingListService.getShoppingLists(userId);
      setLists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lists');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await shoppingListService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    }
  };

  // Add new item
  const addItem = async (itemData: CreateShoppingItemDto): Promise<ShoppingItem | null> => {
    if (!listId) {
      setError('No list selected');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const newItem = await shoppingListService.createShoppingItem(listId, itemData);
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const updateItem = async (id: string, updates: UpdateShoppingItemDto): Promise<ShoppingItem | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await shoppingListService.updateShoppingItem(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await shoppingListService.deleteShoppingItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle item completion
  const toggleItem = async (id: string): Promise<ShoppingItem | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await shoppingListService.toggleItemCompletion(id);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle item');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new shopping list
  const createList = async (name: string): Promise<ShoppingList | null> => {
    try {
      setLoading(true);
      setError(null);
      const newList = await shoppingListService.createShoppingList(userId, name);
      setLists(prev => [...prev, newList]);
      return newList;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create list');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Computed values
  const completedItems = items.filter(item => item.isCompleted);
  const pendingItems = items.filter(item => !item.isCompleted);
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const completedValue = completedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Load data on mount
  useEffect(() => {
    fetchCategories();
    if (userId) {
      fetchLists();
    }
  }, [userId]);

  useEffect(() => {
    if (listId || userId) {
      fetchItems();
    }
  }, [listId, userId]);

  return {
    // Data
    items,
    lists,
    categories,
    completedItems,
    pendingItems,
    
    // State
    loading,
    error,
    
    // Actions
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    createList,
    fetchItems,
    fetchLists,
    clearError,
    
    // Computed values
    totalValue,
    completedValue,
    completionPercentage: items.length > 0 ? (completedItems.length / items.length) * 100 : 0
  };
};
