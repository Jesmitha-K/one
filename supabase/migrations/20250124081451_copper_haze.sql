/*
  # Initial Schema Setup for Dosage Tracker

  1. New Tables
    - medications
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - name (text)
      - dosage (text)
      - frequency (text)
      - time_of_day (text[])
      - notes (text)
      - created_at (timestamp)
      - next_dose (timestamp)
    
  2. Security
    - Enable RLS on medications table
    - Add policies for CRUD operations
*/

CREATE TABLE medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  time_of_day text[] NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  next_dose timestamptz,
  CONSTRAINT valid_frequency CHECK (frequency IN ('daily', 'weekly', 'monthly', 'as_needed'))
);

ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can create their own medication entries"
  ON medications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own medications"
  ON medications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own medications"
  ON medications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medications"
  ON medications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);